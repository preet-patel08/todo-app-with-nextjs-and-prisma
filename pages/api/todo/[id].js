import { db } from '../../../lib/db';

export default async function Handler(req, res) {
    try {
        if (req.method === 'PATCH') {
            // const updatedTodo = await Todo.findByIdAndUpdate(
            //     req.query.id,
            //     { $set: req.body },
            //     { new: true },
            // );
            const updatedTodo = await db.todo.update({
                where: {
                  id: req.query.id,
                },
                data: {
                    ...req.body
                },
              })
              console.log("updatedTodo",updatedTodo);
              
            res.status(201).json({ message: 'Todo updated', updatedTodo });
        } else if (req.method === 'DELETE') {
            // await connectDb();
            const id=req.query.id
            console.log("idmm",req);
            
            const deleteUser = await db.todo.delete({
                where: {
                  id: id,
                },
              })           
               res.status(200).json({ message: 'Todo deleted',deleteUser:deleteUser });
        } else {
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
}
