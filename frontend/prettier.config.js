module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "^@core/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@server/(.*)$",
    "^@ui/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
