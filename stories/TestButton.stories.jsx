import preview from "#.storybook/preview.tsx";
import { expect } from "storybook/test";
import { TestButton } from "~/components/TestButton.jsx";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = preview.meta({
  title: "Tests/TestButton",
  component: TestButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
    // docs: {
    //   subtitle: "Subtitle",
    //   description: {
    //     component: "Another description, overriding the comments",
    //   },
    // },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    primary: { control: "boolean" },
  },
  render: ((args) => (
    <TestButton {...args}>
    </TestButton>
  )),
});

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * Primary button to be used
 */
export const Primary = meta.story({
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    /* layout: "centered", */
    /* docs: { */
    /*   description: { */
    /*     story: "Bla bla", */
    /*   }, */
    /* }, */
  },
  args: {
    primary: true,
  },
  play: async ({ canvas, userEvent }) => {
    // See https://testing-library.com/docs
    // Click on a button and assert that a dialog appears
    const button = canvas.getByTestId("mybutton");
    /* const button = canvas.getByRole("button"); */
    const counter = canvas.getByTestId("counter");
    /* const counter = canvas.getByRole("cell"); */
    await expect(counter.innerText).toBe("0");
    await userEvent.click(button);
    await expect(counter.innerText).toBe("1");
  },
});

/**
 * Secondary mode
 */
export const Secondary = meta.story({
  args: {
    primary: false,
  },
});

/**
 * Secondary mode
 */
export const SecondarySmall = meta.story({
  args: {
    primary: false,
  },
  globals: {
    // Viewport configuration: https://storybook.js.org/docs/essentials/viewport
    viewport: { value: "mobile1", isRotated: false },
  },
});
