# Project: Dynamic CV Editor
This project contains the code necessary to run CV.io, a dynamic `React`-based CV editor SPA, which lets users build a professional CV in real time. Users input their personal information, education, work experience, and skills through a dynamic form, and instantly see a live preview formatted like a resume.

This app implements state management, side effects, prop-sharing, and `localStorage` management.

## Technologies Used
* `HTML`
* `CSS`
* `JavaScript`
* `React`

## Main Features
* **Live CV Preview**: Instant reflection of form inputs in the preview pane
* **Data Persistence**: Automatic data saves to localStorage
* **Form Validation**: Validation for critical personal fields before submission
* **Dynamic Sections**: Dynamic entries for education and experience
* **One-click Reset**: Instant data deletion using the "Reset" button

## `React` Components
This project uses four React components:

### 1. `App`
Main app component; holds top-level `cvData` state (`personal`, `education`, `experience`, and `skills`); uses `useEffect` to persist state to `localStorage` on change.

Renders:
* `<Header />` (static title bar)
* `<CVForm cvData={cvData} setCvData={setCvData} />`
* `<CVPreview cvData={cvData} />`

---
### 2. `Header`
Simple presentational component rendering app's logo and main heading.

---
### 3. `CVForm`
App's form component; updates cvData state based on changes to its input elements' values; features the following functionality:

**Handlers:**
* `handleChange()`: Updates a single field in a non-array section (e.g. `personal`).
* `handleArrayChange()`: Updates a field in an array section (education/experience).
* `handleValidation()`: Checks required personal fields and displays inline error messages.

**Form Operations:**
  * `addEntry()`: Adds a new object to either `education` or `experience` array.
  * `deleteEntry()`: Removes a specific entry by index.
  * `resetForm()`: Resets all fields to initial values and clears errors.

**Validators**:
  * `validateName()`
  * `validateEmail()`
  * `validatePhone()`
  * `validateAddress()`

---
### 4. `CVPreview`
App's visual tool; reflects any changes to `cvData` in real time.

## Getting Started
1. **Clone the repository:**
```bash
git clone https://github.com/adrian-cr/csa-project-cv-editor.git
cd csa-project-cv-editor
```
2. **Install dependencies:**
```bash
npm install
```
3. **Start the development server:**
```bash
npm start
```
This will open the app at [http://localhost:3000](http://localhost:3000) in your browser.
