//C:\Users\Wilkohl\Desktop\vs code\Projekt\codebarn\src\scripts\postinstall.mjs
import figlet from "figlet";
import chalk from "chalk";

figlet("CodeBarn", (err, data) => {
  if (err) {
    console.error("Something went wrong with figlet...");
    console.error(err);
    return;
  }

  console.log(chalk.green(data));
  console.log(
    chalk.cyan(`
Welcome to your new CLI tool! 🚀

To get started, run:
  ${chalk.yellow("codebarn --help")}

Need help?
  📚 Visit: https://example.com/docs
`)
  );
});
