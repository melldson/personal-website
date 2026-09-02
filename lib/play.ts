const FORTUNES = [
  "If the cluster is quiet, leave it quiet.",
  "The best security control is the one nobody has to remember to turn on.",
  "YAML is fine until the indentation has opinions.",
  "kubectl delete is a conversation, not a reflex.",
  "Zone 2 heart rate: the original horizontal autoscaler.",
  "Pipelines should be boring. Boring is a feature.",
  "Default-deny, then open what the product actually needs.",
  "A green deploy at 17:00 is still a deploy at 17:00.",
  "Logs are a privilege. Spend them like one.",
  "The platform's job is to disappear behind the product.",
];

export function fortune() {
  return FORTUNES[Math.floor(Math.random() * FORTUNES.length)] ?? FORTUNES[0];
}

export const PLAY_OUTPUT: Record<string, string> = {
  whoami: "melldson",
  pwd: "/play",
  uptime:
    "up since the last quiet deploy · load average: swim, bike, run",
  top: [
    "  PID  COMMAND            %CPU",
    "    1  kubelet             11.2",
    "    2  zone2-hr             8.4",
    "    3  caffeine             3.1",
    "    4  ssh-agent            0.2",
  ].join("\n"),
  "kubectl get pods": [
    "NAME             READY  STATUS    REST",
    "swim             1/1    Running   endurance",
    "bike             1/1    Running   endurance",
    "run              1/1    Running   endurance",
    "cluster-quiet    1/1    Running   work",
  ].join("\n"),
  "kubectl get nodes": [
    "NAME      STATUS  ROLES",
    "brazil    Ready   home",
    "everysk   Ready   work",
  ].join("\n"),
  "terraform plan":
    "No changes. Infrastructure is settled. Patience still wants an apply.",
  ping: [
    "PING platform: 3 packets transmitted, 3 received, 0% loss",
    "rtt min/avg/max = quiet/quiet/quiet",
  ].join("\n"),
  helm: 'release "life" · namespace brazil · status: deployed',
  date: "the clocks are fine. the pipelines are the ones that drift.",
};

export const LUCKY_COMMANDS = [
  "fortune",
  "uptime",
  "kubectl get pods",
  "kubectl get nodes",
  "terraform plan",
  "top",
  "ping",
  "helm",
] as const;

export function randomLuckyCommand() {
  return LUCKY_COMMANDS[Math.floor(Math.random() * LUCKY_COMMANDS.length)]!;
}
