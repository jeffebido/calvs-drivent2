import app, { init } from "@/app";

const port = +process.env.PORT || 4000;
const HOST = '127.0.0.1';

init().then(() => {
  app.listen({ port: port, host: HOST}, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});
