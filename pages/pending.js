// import connectDb from '../lib/connectDb';
import TodoList from '../components/todo/TodoList';
import Head from 'next/head';
import { Fragment } from 'react';
import { db } from "../lib/db";


function PendingTasks({ todos }) {
    return (
        <Fragment>
            <Head>
                <title>Todos || Pending</title>
                <meta name='description' content='Todos || Manage your tasks easily' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <TodoList todos={todos} />
        </Fragment>
    );
}

export async function getServerSideProps() {
    // await connectDb();
    // const todos = await db.todo.findMany({ isCompleted: false });
    const todos = await db.todo.findMany({
        where: {
            isCompleted: false 
        },
      })
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

export default PendingTasks;
