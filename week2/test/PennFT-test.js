// test/PennFT-test.js
const { expect } = require("chai");

describe("PennFT contract", function () {
  let PennFT;
  let token721;
  let _name = "PennFT";
  let _symbol = "Badge";
  let account1, otheraccounts;

  beforeEach(async function () {
    PennFT = await ethers.getContractFactory("PennFT");
    [owner, account1, ...otheraccounts] = await ethers.getSigners();

    token721 = await PennFT.deploy(_name, _symbol);
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Should has the correct name and symbol ", async function () {
      expect(await token721.name()).to.equal(_name);
      expect(await token721.symbol()).to.equal(_symbol);
    });

    it("Should mint a token with token ID 1 & 2 to account1", async function () {
      const address1 = account1.address;
      await token721.mintTo(address1);
      expect(await token721.ownerOf(1)).to.equal(address1);

      await token721.mintTo(address1);
      expect(await token721.ownerOf(2)).to.equal(address1);

      expect(await token721.balanceOf(address1)).to.equal(2);
    });
  });
});
