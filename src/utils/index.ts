// == Addresses ==
export const small_address = (address: string) =>
  address.slice(0, 8) + "…" + address.slice(-8);

// == Utils ==

import { toast } from "react-toastify";

export const copy_to_clipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
