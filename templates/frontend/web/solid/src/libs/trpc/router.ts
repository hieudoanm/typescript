import { router, procedure } from '~/libs/trpc/init';
import { z } from 'zod';

// sample data
const todos = [{ message: 'Breakfast' }];

// Define and export router
export const appRouter = router({
  // function for getting todos
  getTodos: procedure.query(() => {
    return todos;
  }),
  // function for creating a todo, validates input with zod
  createTodo: procedure
    // define the expected argument for validation
    .input(
      z
        .object({
          message: z.string(),
        })
        .optional()
    )
    // define the implementation destructuring the validated input
    // can destructure rawInput if not using validation
    .mutation(({ input }: { input: { message: string } | undefined }) => {
      console.log(input);
      todos.push({ message: input?.message ?? '' });
      return 'Complete';
    }),
});

// extract routers type and export it
export type AppRouter = typeof appRouter;
