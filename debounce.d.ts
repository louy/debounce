declare module "js-debounce" {
  interface Callback {
    (time: number): void|boolean|number;
  }

  /** cancel an event */
  function debounce(id: string): void;
  /** immediately excute an event */
  function debounce(id: string, exec: boolean): void;
  /** immediately excute an event */
  function debounce(id: string, delay: number, callback: Callback): void;

  module debounce {
    function isSet(id: string): boolean;
    const version: string;
  }

  export = debounce;
}
