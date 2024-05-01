import express from 'express';
import inventoryRoutes from './inventoryRoutes';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json());
app.use('/api', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
