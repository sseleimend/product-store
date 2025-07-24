import e from "express";

const app = e();

app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
