# Kanban Board

The goal of this repo is to demonstrate how I would approach solving a real-world problem. I've created a simple Kanban Board that includes the following functionality:
- 3 columns:
  - To do
  - In progress
  - Done
- Each column contains a maximum of 100 cards
- Cards can be dragged, dropped, or reorderd within any column and between columns
- Cards must include: a Gravatar, title, and description
- Cards can be added by clicking the + icon on any of the columns
- The board takes the entire height of the available screen (respecting the spacing around it)
- Each column must be scrollable with a fixed header
- Board data is persisted in local storage to allow the changes persist after a refresh (only locally)
- In case the board is open in two different tabs: whenever something changes on one tab, the others are automatically updated

## Demos

### Add Task 
![Add Task](https://github.com/samanthajuniper/React-DnD-Kanban-Board/assets/43626685/64a6f86a-9c8f-479b-aacf-9e2f6d9f1edf)

### Clear Task Form (cancel adding task)

![Clear Task Form](https://github.com/samanthajuniper/React-DnD-Kanban-Board/assets/43626685/bc62cdf2-45fb-4cab-9bab-f35bd392f613)


### Drag and Drop Cards 
![dnd task](https://github.com/samanthajuniper/React-DnD-Kanban-Board/assets/43626685/5e0e7767-f29e-49b6-bc1a-1f97b5acf5b2)


### Column Max Reached
![Column Max](https://github.com/samanthajuniper/React-DnD-Kanban-Board/assets/43626685/84179130-3e97-4f02-8d92-5fff2cea51d8)


### Local Storage Persistance
![Local Storage](https://github.com/samanthajuniper/React-DnD-Kanban-Board/assets/43626685/2afeec3a-3c96-4f74-a453-7517f1ade156)


## Tech Stack
- React/TS: These are my tools of choice as I have the most experience with them as a React developer
- React Testing Library & Jest: Used for unit tests
- `react-hook-form`: Used for form building & validation
- `hello-pangea/dnd`: Used to simplify development of drag & drop behavior
- `chakra-ui`: Used for quick UI building, built-in accessibility, & light weight size. 

## Other considerations
- Performance Optimizations
  - In the real world, apps scale. I planned for this inevitability
 by keeping performance optimization in mind with my solution. Normally, I wouldn't try to optimize too early on in a project due to resource constraints and the fact that React handles performance on it's own fairly well, but I've included some highlights on this topic as a way to demonstrate my skill set:
    - When a user creates a new card, the existing cards in that column do not rerender.
    - When a user reorders a card within the same column, the existing cards in that column do not re-render. 
    Note: I did have some trouble with all cards in a column re-rendering when dragging a card to a new column. The originating column's cards do not re-render, but the new column's cards do re-render. But hey, it's good to have goals to work toward!

- Accessibility
  - Chakra UI comes with some nice accessibility features out of the box that I used to my advantage, including keyboard accessibility and automatic aria attributes. 
  - I kept accessibility in mind with my solution by writing semantic HTML, programmatically tying form fields to form labels, and ensuring my color contrast ratios and typography choices met AA standards. 

- Unit Testing
  - This project does not yet have full unit test coverage, but I have included unit tests for some of my utility functions and basic components. In the real world, I recognize the importance of also including unit tests for the components that contain more complex and essential functionality. For now I wanted to provide a snapshot (ba-dum-tss) of my approach to unit testing. 

- Code Quality & Structure
  - This project structure reflects my preferences and what I've worked with most often in the past. I try to make it as easy to read and logically follow as possible. For me this includes things like index roll up, distinct directories for each utility function, types broken out, and Components separated from Views.
  - I've also added `Prettier` as a quality of life tool so I didn't have to spend a ton of time formatting my code. 


## Self Critique

### The Good
- Repo Structure
  - File directory is easy to understand at a glance
  - Simplified imports thanks to index.tsx source files
  - Separation of concerns (components, utils, etc.)
    
 - Mini state normalization (using (Redux pattern)[https://redux.js.org/usage/structuring-reducers/normalizing-state-shape])
    - It's not as flat as it could be, but given that the scale is very small, I didn't need to implement full normalization. But at scale, it would be a good pattern to follow

- User First Approach
  - Add task form
    - Field validation & user feedback: required, email structure
    - Limited char length on title & description
      - Don't want users to scroll past an extra long task card in the list
      - Performance minded: don't have to worry about storing potentially infinite strings, in theory = faster load time
    - Save task button protected against submitting impartial data/making multiple api calls
    - Not draggable & not included in column scroll
      - Preserves order so we don't have random form cards mixed in with the list
      - Since there isn't a column search field, if you wanted to look for existing task names so as not to add a "dupe", you can scroll the static tasks while the form is open
        - note: no such thing as a true dupe given that all new tasks have a uuid
  - Column Max # Tasks
    - Add task icon button disabled + tooltip for user explanation when column max is met
    - Cards can't be dropped into a column where the max is met
      - Snackbar appears at bottom of page explaining why to users
     
- Performance
  - Gravatar
    - Memoized so it doesn't unnecessarily re-render if hashedEmail prop doesn't change (which it never should)
    - Receives a sha-256 hashed email string instead of calculating it on every render, which helps with performance considering that it's an expensive operation to hash a string client side. An even more ideal approach would be to cache the actual       gravatar image at the src url instead of recreating that url on every render--perhaps something to consider at scale.
    - DnD within the same column does not re-render all cards within that column's list
      
- Local Storage Persistence
  - Unregistered local storage update event listener to prevent memory leaks

### The Bad
  - Chakra UI for component building
    - Pro
      - Easy to implement Figma designs quickly
      - Lightweight core package
      - Accessibility included & keyboard navigation
     - Cons
      - I used the style props pattern for styling. Aside from speed, I think these are pretty cumbersome to look at when reading a component file. They just add a lot of extra markup that can be distracting.I did not extract shared styles out into         common reusable props or styled components, but for a large-scale production app I would prioritize that and not rely so heavily on style props
  - Testing
    - I'd like to add more unit tests for components, especially for the TaskBoard, Cards, and Column components. I definitely would not release this to production without these. In the interest of time, I added lower value, easy tests so you could       get an idea of my testing approach for component and function unit tests
  - Duplication
    - Some of my sub-components could have benefited from an internal component library or a shared styled component in order to reduce duplicate styles and markup

### The Ugly
  - Performance
    - DnD between columns triggers a re-render of all cards within the target column list
      - This isn't a huge issue for an app this small, but it definitely would not scale well and isn't the ideal behavior. Can likely be solved with a restructuring of my component tree, making sure prop referential equality is persisting across           renders where it should be, utilizing memoization strategically, or refactoring my state structure and how I’m performing updates
    - Virtualization of task lists would be nice for performance increase & might help band-aid the bullet point above (dnd supports this!)
  - Drag and Drop Animations
    - Very clunky & not smooth enough
    - Task cards don't preserve the same margin/gap around themselves when first dropped into a new position
    - Known console warning that I had a hard time resolving: happens when I drag a card, so my guess is that my setup went wrong somewhere with DnD lib

### Future Iterations
  - Performance
    - Virtualization with @hello-pangea/dnd
    - Re-rendering Mitigation
    - Investigate component-based code splitting. For an app of this size, I'm not sure it's needed, but would be good to look in to.
  - DnD
    - Animation styles
    - Smoothing out transitions
  - Future Features
    - Editing, deleting tasks
    - Custom columns
    - Column creation
    - Draggable columns
    - Task search (by board or column)
  - Investigate additional security concerns: aside from following basic JSX & React best practices, I didn't get too in the weeds on this topic
    - Additional data sanitization/validation needed?

