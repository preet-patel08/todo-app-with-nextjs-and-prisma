
import TodoList from '../components/todo/TodoList';
import Head from 'next/head';
import { Fragment } from 'react';
import { db } from '../lib/db';

function ImportantTasks({ todos }) {
    return (
        <Fragment>
            <Head>
                <title>Todos || Important</title>
                <meta name='description' content='Todos || Manage your tasks easily' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <TodoList todos={todos} />
        </Fragment>
    );
}

export async function getServerSideProps() {
    const todos = await db.todo.findMany({
        where: {
            important: true 
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

export default ImportantTasks;
