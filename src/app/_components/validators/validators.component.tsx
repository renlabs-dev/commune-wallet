import React from "react";
import Link from "next/link";
import { Icon } from "../icon";
import { small_address } from "~/utils";

export const Validators = ({
  open,
  setOpen,
  onSelectValidator,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  onSelectValidator: (validator: {
    name: string;
    description: string;
    netuid: number;
    address: string;
  }) => void;
}) => {
  const validatorsList = [
    {
      name: "vali::comsci",
      description: "Validator of Comsci platform. ",
      netuid: 0,
      address: "5EFBeJXnFcSVUDiKdRjo35MqX6hBpuyMnnGV9UaYuAhqRV4Z",
    },
    {
      name: "vali::smart",
      description: "Validator of Comchat platform.",
      netuid: 0,
      address: "5D4o6H19z6ctWjS9HzxBpMxqhuzCCCsgXk49AqXGPUqZEpRt",
    },
    {
      name: "vali::comstats",
      description: "Validator of Comstats platform.",
      netuid: 0,
      address: "5H9YPS9FJX6nbFXkm9zVhoySJBX9RRfWF36abisNz5Ps9YaX",
    },
    {
      name: "vali::Synthia",
      description: "Validator by Synthia subnet founders.",
      netuid: 3,
      address: "5Cih7zYysiFBNv8XcSKxfivegS2o8gZLthoZZTVPzzKpfUJB",
    },
    {
      name: "vali::Openscope",
      description: "Validator by Openscope subnet founders.",
      netuid: 5,
      address: "5GTLWXb5w7436M65D7HEzCLANXC18fqeM1AGkinyuMsPgHUs",
    },
    {
      name: "vali::Eden",
      description: "Validator by Eden subnet founders.",
      netuid: 10,
      address: "5FjyW3vcB8MkDh19JV88dVLGP6wQEftJC6nXUEobQmdZc6PY",
    },
    {
      name: "vali::Mosaic",
      description: "Validator by Mosaic subnet founders.",
      netuid: 14,
      address: "5DofQSnXnWjF1VUzYVzTQV658GeBExrVFEQ5B4k8Tr1LcBzb",
    },
  ];

  return (
    <div
      role="dialog"
      className={`fixed inset-0 z-[100] ${
        open ? "block" : "hidden"
      } animate-fade-in-down`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[url(/bg-pattern.svg)]" />

      {/* Modal */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative w-[100%] max-w-4xl transform overflow-hidden border bg-black/35 text-left text-white">
            {/* Modal Header */}
            <div className="flex flex-col items-center justify-between gap-3 border-b p-6 md:flex-row">
              <div className="flex flex-col items-center md:flex-row">
                <h3 className="pl-2 text-xl leading-6">Validators List</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border p-2 transition duration-200 "
              >
                <Icon src="/icons/close.svg" className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-y-4 overflow-y-auto p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Validators</h2>
                <Link href="https://www.comstats.org/" target="_blank">
                  View all
                </Link>
              </div>
              {validatorsList.map((item) => (
                <button
                  key={item.address}
                  onClick={() => {
                    onSelectValidator(item);
                    setOpen(false);
                  }}
                  className={`text-md flex cursor-pointer items-center gap-x-3 overflow-auto border p-5 transition hover:bg-green-500/10`}
                >
                  <div className="flex w-full flex-col items-start gap-1">
                    <span className="font-semibold">{item.name}</span>
                    <div className="flex w-full flex-col items-start justify-between md:flex-row">
                      <span>{item.description}</span>
                      <span className="text-gray-400">
                        {small_address(item.address)} | NetUID: {item.netuid}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
