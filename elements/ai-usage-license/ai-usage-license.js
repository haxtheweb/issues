/**
 * A list of AIUL licenses and their associated data.
 * Based on the AIUL API: https://dmd-program.github.io/aiul/api/
 */
export class aiulList {
  constructor(mode = "full") {
    // AIUL license data based on https://dmd-program.github.io/aiul/api/licenses.json
    let list = {
      NA: {
        name: "Not Allowed",
        link: "https://dmd-program.github.io/aiul/licenses/na/1.0.0/",
        image:
          "https://cdn.jsdelivr.net/gh/dmd-program/aiul@main/assets/images/licenses/aiul-na.png",
        description:
          "No AI tools allowed. All work must be entirely student-generated.",
      },
      WA: {
        name: "With Approval",
        link: "https://dmd-program.github.io/aiul/licenses/wa/1.0.0/",
        image:
          "https://cdn.jsdelivr.net/gh/dmd-program/aiul@main/assets/images/licenses/aiul-wa.png",
        description:
          "AI tools may be used only with prior instructor approval. Specific use cases must be agreed upon before the assignment is submitted.",
      },
      CD: {
        name: "Conceptual Development",
        link: "https://dmd-program.github.io/aiul/licenses/cd/1.0.0/",
        image:
          "https://cdn.jsdelivr.net/gh/dmd-program/aiul@main/assets/images/licenses/aiul-cd.png",
        description:
          "AI tools may be used for research and ideation, but the final work must be entirely student-generated.",
      },
      TC: {
        name: "Transformative Collaboration",
        link: "https://dmd-program.github.io/aiul/licenses/tc/1.0.0/",
        image:
          "https://cdn.jsdelivr.net/gh/dmd-program/aiul@main/assets/images/licenses/aiul-tc.png",
        description:
          "AI tools may be used as a collaborative partner, but students must significantly transform or build upon AI-generated content.",
      },
      DP: {
        name: "Directed Production",
        link: "https://dmd-program.github.io/aiul/licenses/dp/1.0.0/",
        image:
          "https://cdn.jsdelivr.net/gh/dmd-program/aiul@main/assets/images/licenses/aiul-dp.png",
        description:
          "AI tools may be used under the student's direction as a creative production tool, with student responsible for all creative decisions.",
      },
      IU: {
        name: "Integrated Usage",
        link: "https://dmd-program.github.io/aiul/licenses/iu/1.0.0/",
        image:
          "https://cdn.jsdelivr.net/gh/dmd-program/aiul@main/assets/images/licenses/aiul-iu.png",
        description:
          "Full, intentional, and skillful use of AI tools is permitted and encouraged as part of the assignment.",
      },
    }
    // support mutating the array into a select list
    if (mode == "select") {
      var select = {}
      for (var i in list) {
        select[i] = list[i].name
      }
      return select
    }
    return list
  }
}

/**
 * A list of AIUL media modifiers and their associated data.
 */
export class aiulModifiers {
  constructor(mode = "full") {
    // AIUL modifier data based on https://dmd-program.github.io/aiul/api/modifiers.json
    let list = {
      "3D": {
        name: "3D Design",
        fullName: "3-Dimensional Design",
        link: "https://dmd-program.github.io/aiul/modifiers/3d/1.0.0/",
      },
      AU: {
        name: "Audio",
        fullName: "Audio",
        link: "https://dmd-program.github.io/aiul/modifiers/audio/1.0.0/",
      },
      CO: {
        name: "Code",
        fullName: "Code",
        link: "https://dmd-program.github.io/aiul/modifiers/code/1.0.0/",
      },
      IM: {
        name: "Image",
        fullName: "Image",
        link: "https://dmd-program.github.io/aiul/modifiers/image/1.0.0/",
      },
      MX: {
        name: "Mixed Media",
        fullName: "Mixed Media",
        link: "https://dmd-program.github.io/aiul/modifiers/mixed-media/1.0.0/",
      },
      TR: {
        name: "Traditional Media",
        fullName: "Traditional Media",
        link: "https://dmd-program.github.io/aiul/modifiers/traditional-media/1.0.0/",
      },
      VD: {
        name: "Video",
        fullName: "Video",
        link: "https://dmd-program.github.io/aiul/modifiers/video/1.0.0/",
      },
      WR: {
        name: "Writing",
        fullName: "Writing",
        link: "https://dmd-program.github.io/aiul/modifiers/writing/1.0.0/",
      },
    }
    if (mode == "select") {
      var select = { "": "No modifier" }
      for (var i in list) {
        select[i] = list[i].name
      }
      return select
    }
    return list
  }
}

import { LitElement, html, css } from "lit"
import { SchemaBehaviors } from "@haxtheweb/schema-behaviors/schema-behaviors.js"
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js"
/**
 * `ai-usage-license`
 * `A simple way of applying a semantically accurate AI usage license (AIUL) to work.`
 * @demo demo/index.html
 * @element ai-usage-license
 */
class AiUsageLicense extends SchemaBehaviors(DDDSuper(LitElement)) {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
          line-height: var(--ddd-line-height-140);
          background-color: var(--ai-usage-license-background-color);
        }
        :host:after {
          content: "AI Usage License";
          position: relative;
          float: right;
          bottom: var(--ddd-spacing-9);
          right: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-ms);
          color: var(--ddd-theme-default-slateGray);
          font-style: italic;
        }
        .license-body {
          padding: var(--ddd-spacing-8);
          background-color: var(--ddd-theme-default-limestoneMaxLight);
          color: var(--ddd-theme-default-slateGray);
        }
        .license-link {
          font-style: italic;
        }
        a,
        a:any-link,
        a:-webkit-any-link {
          color: var(--ddd-theme-default-link);
          font-weight: var(--ddd-font-weight-bold);
        }
        .license-badge img {
          margin: 0 var(--ddd-spacing-2) var(--ddd-spacing-2) 0;
          height: var(--ddd-icon-3xl);
          vertical-align: middle;
        }
        .license-tag {
          font-family: var(--ddd-font-navigation);
          font-weight: var(--ddd-font-weight-bold);
          font-size: var(--ddd-font-size-s);
          letter-spacing: 0.05em;
        }
        .license-description {
          margin-top: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-s);
        }
      `,
    ]
  }

  render() {
    return html`
      <div class="license-body">
        ${this.licenseImage
          ? html`
              <a
                class="license-badge"
                target="_blank"
                href="${this.licenseLink}"
                rel="noopener noreferrer"
                aria-label="${this.licenseName} - AI Usage License"
                ><img
                  loading="lazy"
                  alt="${this.licenseTag} - ${this.licenseName}"
                  src="${this.licenseImage}"
              /></a>
            `
          : ``}
        <span class="license-tag"
          ><a
            class="license-link"
            target="_blank"
            href="${this.licenseLink}"
            rel="noopener noreferrer"
            >${this.licenseTag}</a
          ></span
        >
        ${this.licenseName
          ? html`<span> &mdash; ${this.licenseName}</span>`
          : ``}
        ${this.licenseDescription
          ? html`<div class="license-description">${this.licenseDescription}</div>`
          : ``}
      </div>
    `
  }

  static get tag() {
    return "ai-usage-license"
  }

  static get properties() {
    return {
      ...super.properties,
      /**
       * License code shorthand, e.g. "NA", "WA", "CD", "TC", "DP", "IU".
       */
      license: {
        type: String,
      },
      /**
       * Optional media modifier code, e.g. "3D", "AU", "CO", "IM", "MX", "TR", "VD", "WR".
       */
      modifier: {
        type: String,
      },
      /**
       * Full license name, calculated from the license property.
       */
      licenseName: {
        type: String,
        attribute: "license-name",
      },
      /**
       * License badge image URL.
       */
      licenseImage: {
        type: String,
        attribute: "license-image",
      },
      /**
       * License details link.
       */
      licenseLink: {
        type: String,
        attribute: "license-link",
      },
      /**
       * License description text.
       */
      licenseDescription: {
        type: String,
        attribute: "license-description",
      },
      /**
       * The full AIUL tag code, e.g. "AIUL-NA" or "AIUL-CD-IM".
       */
      licenseTag: {
        type: String,
        attribute: "license-tag",
      },
    }
  }

  constructor() {
    super()
    this.aiulList = new aiulList()
    this.aiulModifiers = new aiulModifiers()
    this.license = null
    this.modifier = null
    this.licenseName = null
    this.licenseImage = null
    this.licenseLink = null
    this.licenseDescription = null
    this.licenseTag = null
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "license" || propName === "modifier") {
        this._licenseUpdated(this.license, this.modifier)
      }
    })
  }

  static get haxProperties() {
    return {
      canScale: false,
      canEditSource: true,
      gizmo: {
        title: "AI Usage License",
        description: "Display an AI Usage License (AIUL) badge for your work",
        icon: "hardware:memory",
        color: "blue",
        tags: [
          "Other",
          "content",
          "ai",
          "license",
          "aiul",
          "ai-usage",
          "attribution",
        ],
        handles: [],
        meta: {
          author: "HAXTheWeb core team",
        },
      },
      settings: {
        configure: [
          {
            property: "license",
            title: "License",
            description:
              "The AI usage license level for this work. See https://dmd-program.github.io/aiul/ for details.",
            inputMethod: "select",
            options: new aiulList("select"),
            icon: "hardware:memory",
          },
          {
            property: "modifier",
            title: "Media Modifier",
            description:
              "Optional media domain modifier. Specifies the type of media this license applies to.",
            inputMethod: "select",
            options: new aiulModifiers("select"),
            icon: "image:photo",
          },
        ],
        advanced: [],
      },
      demoSchema: [
        {
          tag: "ai-usage-license",
          properties: {
            license: "CD",
            modifier: "IM",
          },
          content: "",
        },
      ],
    }
  }

  /**
   * Update license name, image, link, and description when license or modifier changes.
   */
  _licenseUpdated(license, modifier) {
    if (!license || typeof this.aiulList[license] === "undefined") {
      return
    }
    const licenseData = this.aiulList[license]
    const modifierData =
      modifier && this.aiulModifiers[modifier]
        ? this.aiulModifiers[modifier]
        : null

    // Build the AIUL tag string (e.g. "AIUL-CD" or "AIUL-CD-IM")
    this.licenseTag = modifierData
      ? `AIUL-${license}-${modifier}`
      : `AIUL-${license}`

    this.licenseName = modifierData
      ? `${licenseData.name} / ${modifierData.name}`
      : licenseData.name

    this.licenseDescription = licenseData.description

    this.licenseLink = modifierData
      ? `https://dmd-program.github.io/aiul/combinations/${license.toLowerCase()}-${modifier.toLowerCase()}.html`
      : licenseData.link

    // Combination images use lowercase codes, e.g. aiul-cd-im.png
    this.licenseImage = modifierData
      ? `https://cdn.jsdelivr.net/gh/dmd-program/aiul@main/assets/images/licenses/aiul-${license.toLowerCase()}-${modifier.toLowerCase()}.png`
      : licenseData.image
  }
}

globalThis.customElements.define(AiUsageLicense.tag, AiUsageLicense)
export { AiUsageLicense }
