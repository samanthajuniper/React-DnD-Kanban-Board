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

### Clear Task Form (cancel adding task)

### Drag and Drop Cards 

### Column Max Reached

### Local Storage Persistance


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

### Positives
- User First Approach
  I added a few nice touches that make for an overall smoother user experience including:
    - Required form fields with clear directions in tooltips when data is missing for the add card form
    - Field validation for the Email field on the add card form to ensure a valid email was entered
    - Visual warning indicators when a column has reached the 100 card maximum: The add card icon is disabled and if a use tries to drag an existing card to a maxed out column it automatically cancels the drop action, returns the card to its original position, and displays an explanation message on the screen.

### Improvements
- Expanding Card Functionality
  I didn't set myself up for quick iteration in regards to expanding Card functionality. As it currently stands, my component structure separates static card rendering and car creation into different components. In order to allow editing a card, it would be best for me to combine these into one Card component so that I can easily switch back and forth between different views within the same Card component (i.e. using static card data to populate the card form).

  As mentioned above in the Performance Optimization section, I have some work to do on improving the extra re-renders that happen when moving cards between columns. Ideally, moving a card to a new colunmn would not trigger re-renders for each existing card in that column. 


### Nice to Haves
  This project could be expanded in many ways. A few ideas: editing a card, deleting a card, drag & drop columns, column creation, and mobile usage. 
