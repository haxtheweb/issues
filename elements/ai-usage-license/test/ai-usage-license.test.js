import { fixture, expect, html } from "@open-wc/testing";

import "../ai-usage-license.js";

describe("ai-usage-license test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ai-usage-license license="CD"></ai-usage-license>
    `);
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it("sets license tag to AIUL-CD", async () => {
    expect(element.licenseTag).to.equal("AIUL-CD");
  });

  it("sets license name to Conceptual Development", async () => {
    expect(element.licenseName).to.equal("Conceptual Development");
  });

  it("sets license image for CD", async () => {
    expect(element.licenseImage).to.include("aiul-cd.png");
  });
});

describe("ai-usage-license with modifier test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ai-usage-license license="CD" modifier="IM"></ai-usage-license>
    `);
  });

  it("sets license tag to AIUL-CD-IM", async () => {
    expect(element.licenseTag).to.equal("AIUL-CD-IM");
  });

  it("sets combined license name", async () => {
    expect(element.licenseName).to.equal("Conceptual Development / Image");
  });

  it("sets combination image URL", async () => {
    expect(element.licenseImage).to.include("aiul-cd-im.png");
  });
});
