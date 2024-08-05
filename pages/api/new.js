// import connectDb from '../../lib/connectDb';
// import Todo from '../../models/Todo';

// export default async function Handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             // await connectDb();
//             const todo = await Todo.create({
//                 content: req.body.content,
//                 important: false,
//                 task_done: false,
//             });
//             res.status(201).json({ message: 'OK', todo: todo });
//         } catch (err) {
//             console.log('Error: ', err.message);
//             res.status(500).json({ message: 'FAILED', error: err.message });
//         }
//     } else {
//         res.status(400).json({ message: 'FAILED' });
//     }
// }

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("new request logged");
  
  if (req.method === 'POST') {
    const { content } = req.body;

    try {
      const todo = await prisma.todo.create({
        data: {
            title:content,
        },
      });
      console.log("todo111",todo);
      
      res.status(201).json({ todo });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo',error:error });
    } finally {
      await prisma.$disconnect();
    }
  }else if(req.method === 'DELETE'){
    const { content } = req.params.id;
    console.log("on delete",content);

    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id: id,
        },
      })
      console.log("todo111",deleteUser);
      
      res.status(201).json({ deleteUser });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo',error:error });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
