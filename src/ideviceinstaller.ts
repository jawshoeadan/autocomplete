import { connectediOSDevices } from "./ideviceinfo";
const iosDeviceInstalledApps: Fig.Generator = {
  script: ["ideviceinstaller", "-l", "-o", "list_user"],
  postProcess: function (output) {
    return output
      .split("\n")
      .slice(1)
      .map((line) => {
        const [bundleId, _, name] = line.split(",");
        return {
          displayName: name.replace(/"/g, ""),
          name: bundleId.replace(/"/g, ""),
          insertValue: bundleId.replace(/"/g, ""),
        };
      });
  },
};
const completionSpec: Fig.Spec = {
  name: "ideviceinstaller",
  description: "",
  subcommands: [
    {
      name: ["-i", "--install"],
      description: "Install app from package file specified by ARCHIVE",
      args: {
        name: "Archive",
        template: "filepaths",
      },
    },
    {
      name: ["-l", "--list-apps"],
      description: "List installed apps",
      subcommands: [
        {
          name: "-o",
          args: [
            {
              name: "list_user",
              description: "List user apps only (this is the default)",
            },
            { name: "list_system", description: "List system apps only" },
            {
              name: "list_all",
              description: "List all types of apps",
            },
            {
              name: "xml",
              description: "Print full output as xml plist",
            },
          ],
        },
      ],
    },
    {
      name: ["-U", "--uninstall"],
      description: "Uninstall app specified by APPID",
      args: {
        name: "APPID",
        generators: iosDeviceInstalledApps,
      },
    },
  ],
  options: [
    {
      name: ["--help", "-h"],
      description: "Show help for ideviceinstaller",
    },
    {
      name: ["-u", "--udid"],
      description: "Target specific device by UDID",
      args: {
        name: "UDID",
        generators: connectediOSDevices,
      },
    },
    {
      name: ["-g", "--upgrade"],
      description: "Upgrade app from package file specified by ARCHIVE",
      args: {
        name: "Archive",
        template: "filepaths",
      },
    },
    {
      name: ["-n", "--network"],
      description: "Connect to a network device",
    },
    {
      name: ["-v", "--version"],
      description: "Show version for ideviceinstaller",
    },
  ],

  // Only uncomment if ideviceinstaller takes an argument
  // args: {}
};
export default completionSpec;
