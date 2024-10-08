import { expect } from "chai";
import { ethers } from "hardhat";

describe("SmartSizz Contract", function () {
  let SmartSizz: any;
  let smartSizz: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    SmartSizz = await ethers.getContractFactory("SmartSizz");
    [owner, addr1, addr2, ] = await ethers.getSigners();
    smartSizz = await SmartSizz.deploy();
  });

  it("Should have the correct name and symbol", async function () {
    expect(await smartSizz.name()).to.equal("SmartSizz");
    expect(await smartSizz.symbol()).to.equal("SSZ");
  });

  it("Should mint a token and assign it to the owner with correct URI", async function () {
    const tokenId = 1;
    const tokenURI = "https://example.com/token/1";
    await smartSizz.safeMint(owner.address, tokenId, tokenURI);
    expect(await smartSizz.ownerOf(tokenId)).to.equal(owner.address);
    expect(await smartSizz.tokenURI(tokenId)).to.equal(tokenURI);
  });

  it("Should transfer a token from owner to addr1", async function () {
    const tokenId = 1;
    await smartSizz.safeMint(owner.address, tokenId, "https://example.com/token/1");
    await smartSizz.transferFrom(owner.address, addr1.address, tokenId);
    expect(await smartSizz.ownerOf(tokenId)).to.equal(addr1.address);
  });

  it("Should support ERC721 and ERC721URIStorage interfaces", async function () {
    expect(await smartSizz.supportsInterface("0x80ac58cd")).to.be.true; // ERC721
    expect(await smartSizz.supportsInterface("0x5b5e139f")).to.be.true; // ERC721Metadata
  });

});
