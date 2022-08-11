import { Router } from "express"


const router: Router = Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

export { router as indexRoutes }
