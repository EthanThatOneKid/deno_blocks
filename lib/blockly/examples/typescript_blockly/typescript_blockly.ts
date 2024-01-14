import { default as Blockly } from "blockly";
import { blockly, type BlocklyOptions } from "#/lib/blockly/mod.ts";
import { storageKey } from "./storage_key.ts";

const TOOLBOX: Blockly.utils.toolbox.ToolboxDefinition = {
  // TODO: Add categories.
  // https://developers.google.com/blockly/guides/configure/web/toolbox#categories
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "on_http_request",
    },

    // JSON blocks.
    {
      "kind": "block",
      "type": "object",
    },
    {
      "kind": "block",
      "type": "member",
    },
    {
      "kind": "block",
      "type": "math_number",
    },
    {
      "kind": "block",
      "type": "text",
    },
    {
      "kind": "block",
      "type": "logic_boolean",
    },
    {
      "kind": "block",
      "type": "logic_null",
    },
    {
      "kind": "block",
      "type": "lists_create_with",
    },
  ],
};

const BLOCKS = [
  // TODO: Create function definition block.
  // TODO: Create call function block with drop down containing function names.
  // TODO: Create import block.
  // TODO: Create HTTP request handler block.
  // TODO: Deploy button.
  {
    type: "on_http_request",
    message0: "async function handle(r: Request) {\n %1 \n}",
    args0: [
      {
        type: "field_multilinetext",
        name: "CODE",
        text: "return new Response('Hello, world!');",
        spellcheck: false,
      },
    ],
    colour: 230,
    hat: "cap",
  },
  {
    type: "object",
    message0: "{ %1 %2 }",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "MEMBERS",
      },
    ],
    output: null,
    colour: 230,
  },
  {
    type: "member",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "field_input",
        name: "MEMBER_NAME",
        text: "",
      },
      {
        type: "field_label",
        name: "COLON",
        text: ":",
      },
      {
        type: "input_value",
        name: "MEMBER_VALUE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },
];

enum Order {
  ATOMIC,
}

function GENERATOR(g: Blockly.CodeGenerator) {
  g.forBlock["logic_null"] = () => {
    return ["null", Order.ATOMIC];
  };

  g.forBlock["text"] = (block) => {
    const textValue = block.getFieldValue("TEXT");
    const code = `"${textValue}"`;
    return [code, Order.ATOMIC];
  };

  g.forBlock["math_number"] = (block) => {
    const code = String(block.getFieldValue("NUM"));
    return [code, Order.ATOMIC];
  };

  g.forBlock["logic_boolean"] = (block) => {
    const code = (block.getFieldValue("BOOL") === "TRUE") ? "true" : "false";
    return [code, Order.ATOMIC];
  };

  g.forBlock["member"] = (block, generator) => {
    const name = block.getFieldValue("MEMBER_NAME");
    const value = generator.valueToCode(
      block,
      "MEMBER_VALUE",
      Order.ATOMIC,
    );
    const code = `"${name}": ${value}`;
    return code;
  };

  g.forBlock["lists_create_with"] = (block, generator) => {
    const values = [];
    const itemCount = (block as unknown as { itemCount_: number }).itemCount_;
    for (let i = 0; i < itemCount; i++) {
      const valueCode = generator.valueToCode(block, "ADD" + i, Order.ATOMIC);
      if (valueCode) {
        values.push(valueCode);
      }
    }

    const valueString = values.join(",\n");
    const indentedValueString = generator.prefixLines(
      valueString,
      generator.INDENT,
    );
    const codeString = "[\n" + indentedValueString + "\n]";
    return [codeString, Order.ATOMIC];
  };

  g.forBlock["object"] = (block, generator) => {
    const statementMembers = generator.statementToCode(block, "MEMBERS");
    const code = "{\n" + statementMembers + "\n}";
    return [code, Order.ATOMIC];
  };

  (g as (typeof g & {
    scrub_: typeof g["scrub_"];
  })).scrub_ = (
    block,
    code,
    thisOnly,
  ) => {
    const nextBlock = block.nextConnection &&
      block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      return code + ",\n" + g.blockToCode(nextBlock);
    }

    return code;
  };
}

const THEME = Blockly.Theme.defineTheme("typescript", {
  // TODO: Update theme.
  // https://developers.google.com/blockly/guides/configure/web/appearance/themes#built-in
  "name": "TypeScript",
  "base": Blockly.Themes.Classic,
  "startHats": true,
});

export type TypeScriptBlocklyOptions = Pick<
  BlocklyOptions,
  "blocklyElement" | "codeElement"
>;

export function typescriptBlockly(options: TypeScriptBlocklyOptions) {
  blockly({
    ...options,
    name: "TypeScript",
    toolbox: TOOLBOX,
    blocks: BLOCKS,
    generator: GENERATOR,
    theme: THEME,
    storageKey,
    trashcan: true,
  });
}
