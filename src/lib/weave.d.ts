export declare module "preact/src/jsx" {
  namespace JSXInternal {
    interface IntrinsicElements {
      "weave-button": JSX.HTMLAttributes<HTMLElement> & {
        type?: "button" | "submit" | "reset";
        variant?: "outlined" | "flat" | "solid";
        density?: "high" | "medium";
        iconposition?: "left" | "right";
      };
      "weave-select": JSX.HTMLAttributes<HTMLElement> & {
        placeholder?: any;
        value: any;
        children: JSX.Element[];
        onChange: (e: CustomEvent<{ value: string; text: string }>) => void;
      };
      "weave-select-option": JSX.HTMLAttributes<HTMLElement> & {
        disabled?: true;
        value: any;
        children?: JSX.Element | string;
      };
      "weave-icon-button": JSX.HTMLAttributes<HTMLElement> & {
        disabled?: true;
      };
      "weave-toggle": JSX.HTMLAttributes<HTMLElement> & {
        disabled?: true;
        toggled?: boolean;
        onChange: (e: CustomEvent<{ value: string; checked: boolean }>) => void;
      };
      "weave-editable": JSX.HTMLAttributes<HTMLElement> & {
        edit?: true;
        doubleclick?: true;
        onChange: (e: CustomEvent<{ value: string; text: string }>) => void;
      };
    }
  }
}
