// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DeadCaster {
    struct SecretMetadata {
        address creator;
        /// @notice How long (in seconds) the secret should remain so past the creator's last update.
        uint256 longevity;
        string scheme;
        uint256 fid;
        uint256 bounty;
        bool bountyPaid;
    }

    event SecretCreated(
        address indexed creator,
        uint256 index,
        string scheme,
        uint256 indexed fid,
        uint256 bounty
    );
    event SecretRevealed(
        address indexed creator,
        uint256 index,
        string scheme,
        uint256 indexed fid,
        uint256 bounty,
        bytes secret
    );

    SecretMetadata[] public _metas;
    bytes[] private _secrets;
    /// @dev The unix timestamp at which the address was last seen.
    mapping(address => uint256) public _lastSeen;

    function createSecret(
        uint256 longevity,
        bytes calldata secret,
        string calldata scheme,
        uint256 fid
    ) external payable {
        _updateLastSeen();
        _metas.push(
            SecretMetadata({
                creator: msg.sender,
                longevity: longevity,
                scheme: scheme,
                fid: fid,
                bounty: msg.value,
                bountyPaid: false
            })
        );
        _secrets.push(secret);
        emit SecretCreated(
            msg.sender,
            _metas.length - 1,
            scheme,
            fid,
            msg.value
        );
    }

    /// @notice Reveals the secret at the specified index.
    function revealSecret(uint256 index) external returns (bytes memory) {
        require(index < _metas.length, "no such secret");
        address creator = _metas[index].creator;
        uint256 expiry = _lastSeen[creator] + _metas[index].longevity;
        require(block.timestamp >= expiry, "not expired");
        emit SecretRevealed(
            creator,
            index,
            _metas[index].scheme,
            _metas[index].fid,
            _metas[index].bounty,
            _secrets[index]
        );

        if (!_metas[index].bountyPaid) {
            _metas[index].bountyPaid = true;

            payable(msg.sender).transfer(_metas[index].bounty);
        }

        return _secrets[index];
    }

    function revealSecretView(
        uint256 index
    ) external view returns (bytes memory) {
        require(index < _metas.length, "no such secret");
        address creator = _metas[index].creator;
        uint256 expiry = _lastSeen[creator] + _metas[index].longevity;
        require(block.timestamp >= expiry, "not expired");

        return _secrets[index];
    }

    /// @notice Returns the time (in seconds since the epoch) at which the owner was last seen, or zero if never seen.
    function getLastSeen(address owner) external view returns (uint256) {
        return _lastSeen[owner];
    }

    function getMetas(
        uint256 offset,
        uint256 count
    ) external view returns (SecretMetadata[] memory) {
        if (offset >= _metas.length) return new SecretMetadata[](0);
        uint256 c = offset + count <= _metas.length
            ? count
            : _metas.length - offset;
        SecretMetadata[] memory metas = new SecretMetadata[](c);
        for (uint256 i = 0; i < c; ++i) {
            metas[i] = _metas[offset + i];
        }
        return metas;
    }

    function refreshSecrets() external {
        _updateLastSeen();
    }

    function _updateLastSeen() internal {
        _lastSeen[msg.sender] = block.timestamp;
    }
}
