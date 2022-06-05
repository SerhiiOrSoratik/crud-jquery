import {Router} from 'express'
import product from './productsRoute';

const router = Router();

router.use('/product', product);

export default router
