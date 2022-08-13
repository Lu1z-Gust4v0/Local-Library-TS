import { Router } from "express"


const router: Router = Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

export { router as usersRoutes } 