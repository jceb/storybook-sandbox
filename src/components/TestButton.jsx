import { createSignal } from "solid-js";

/**
 * Display Google sso provider
 * @typedef {Object} PropsBase
 * @property {boolean} primary Is primary button
 *
 * @typedef {PropsBase & import('solid-js').JSX.HTMLAttributes<HTMLElement>} Props
 */

/**
 * A really nice test button
 *
 * @type {import('solid-js').Component<Props>}
 * @params {Props} props Properties
 */
export const TestButton = (props) => {
  const primary = props.primary || false;
  const [count, setCount] = createSignal(0);

  return (
    <div
      class={`w-40 md:w-50 p-4 md:p-8 flex justify-center rounded ${
        primary
          ? `bg-red-400 dark:bg-yellow-400`
          : "bg-blue-400 dark:bg-green-400"
      }`}
    >
      <button
        role="button"
        data-testid="mybutton"
        type="submit"
        class="bg-slate-200 p-2 rounded shadow-sm"
        onClick={() => setCount(count() + 1)}
      >
        Counter <span role="cell" data-testid="counter">{count()}</span>
      </button>
    </div>
  );
};
