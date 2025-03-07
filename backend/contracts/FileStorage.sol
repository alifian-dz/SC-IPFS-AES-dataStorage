// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct FileData {
        address owner;
        string cid;
        uint256 timestamp;
    }

    mapping(address => FileData[]) private userFiles;

    event FileUploaded(address indexed owner, string cid, uint256 timestamp);

    function uploadFile(string memory _cid) public {
        userFiles[msg.sender].push(FileData(msg.sender, _cid, block.timestamp));
        emit FileUploaded(msg.sender, _cid, block.timestamp);
    }

    function getFiles() public view returns (FileData[] memory) {
        return userFiles[msg.sender];
    }
}
