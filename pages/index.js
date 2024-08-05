import { useState } from 'react';
import NewTodo from '../components/todo/NewTodo';
import TodoList from '../components/todo/TodoList';
import axios from 'axios';
import Head from 'next/head';
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

function Home({ todos }) {
    const [tasks, setTasks] = useState(todos);

    const onSubmitHandler = async todo => {
        try {
            try {
                const response = await axios.post('/api/new', { content: todo });
                setTasks((prev) => [
                    ...prev,
                    {
                        ...response.data.todo,
                        content:response.data.todo.title,
                        id: response.data.todo.id.toString(),
                    },
                ]);
            } catch (err) {
                console.error(err.message);
            }
            res.status(201).json({ todo });
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Head>
                <title>Todos || Home</title>
                <meta name='description' content='Todos || Manage your tasks easily' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <NewTodo onSubmit={onSubmitHandler} />
            <TodoList todos={tasks} />
        </>
    );
}

export async function getServerSideProps() {
    // await connectDb();

    const todos = await db.todo.findMany({});
    if (todos.length){

        return {
            props: {
                todos: todos.map(todo => ({
                    _id: todo.id.toString(),
                    content: todo.title,
                    important: todo.important,
                    isCompleted: todo.isCompleted,
                })),
            },
        };
    }
    else{

        return {
            props: {
                todos: []
            }
        }
    }


}

export default Home;
