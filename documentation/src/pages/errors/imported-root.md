---
layout: ~/layouts/Documentation.astro
---

# Imported root error

Overflowed doesn't export anything from the root of the package, and so throws an error when it's been imported.

```ts
// don't import from the project root
import ... from "overflowed"; // ❌
const ... = require("overflowed"); // ❌

// instead import from the path your project requires
import ... from "overflowed/core"; // ✅
import ... from "overflowed/react"; // ✅

const ... = require("overflowed/core"); // ✅
const ... = require("overflowed/react"); // ✅

```
