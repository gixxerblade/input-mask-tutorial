![mask image](https://inputmask.s3.amazonaws.com/mask.jpg)

# How to normalize an input (Colloquially known as how to create an input mask)

---

## Table of Contents

1. [Motivation](#motivation)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Project](#project)
5. [Wrap it up](#wrapping-it-up)
6. [Vet's Who Code](#vets-who-code)

## Motivation

As part of the [Vets Who Code](vetswhocode.io) organization part of our training is helping to maintain the website. We train vets in the whole process, from HTML, CSS, JavaScript, JAMStack, ReactJS, GatsbyJS, JestJS testing, and a mess of other technologies. One of the "tickets" for the website was to format the phone field in a contact form so when the user types in their number it will automatically, as they type, format the phone from 1111111111 to 111-111-1111.

An input mask is a way of formatting data to a standard form. For instance, in the US a zip code is five numbers. When a user types in a form on a website and it POSTs to your database you want the info preformatted for your use, plus you want to make it easier for the user to type in the information.

You can help people enter data correctly into by providing input masks for fields that contain data that is always formatted a certain way. For example, you can use an input mask to make sure that people enter correctly formatted phone numbers into a phone number field.

In this article I am going to show you some tricks to create an input mask in React.

## Prerequisites

A basic understanding of HTML, CSS, and JavaScript are needed for this tutorial. Also your favorite code editor (I'm using [VS Code](https://code.visualstudio.com/)) I will do my best to show everything else.

## Setup

Start with creating a new React App. In your command line type:

```bash
npx create-react-app input-mask-tutorial
cd input-mask-tutorial
npm start
```

![React App.js](https://i.ibb.co/bdHVZT3/react-Start.png)

Delete the boilerplate that comes preloaded with a React App like everything between the `<div className="App">` and the `App.css` file. Download a new one [here](https://inputmask.s3.amazonaws.com/App.css). It'll make it easier because we won't have to spend time styling the form.

Go ahead and create a form with three inputs, a button, and somewhere to display our 'output':

```javascript
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Input Mask Example</h1>
      <h2>Form Example</h2>
      <form className="testform">
        <input type="text" placeholder="First name" name="firstName" />
        <input type="text" placeholder="Last name" name="lastName" />
        <input type="tel" placeholder="Telephone" name="phone" />
        <input type="reset" value="Reset" />
      </form>
      <h2>Form Submitted Data</h2>
      <pre>
        <code>{JSON.stringify(form)}</code>
      </pre>
    </div>
  );
}
export default App;
```

## Project

Now we can add some action to these input fields.

1. Import `useState`.
2. Add an `initialState`.
3. Add a form state. This allows us to update the state with new values that are typed in the form.
4. Add a way to reset the form.
5. Add a way to "set" the values in the form.

```javascript
import React, { useState } from "react";
import "./App.css";

function App() {
  const initialState = {
    firstName: "",
    lastName: "",
    phone: "",
  };
  const [form, setForm] = useState(initialState);

  const reset = (event) => {
    event.preventDefault();
    setForm({ ...form, ...initialState });
  };

  return (
    <div className="App">
      <h1>Input Mask Example</h1>
      <h2>Form Example</h2>
      <form onReset={reset} className="testform">
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={form.firstName}
          onChange={(event) => {
            const { value } = event.target;
            setForm({ ...form, firstName: value });
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={form.lastName}
          onChange={(event) => {
            const { value } = event.target;
            setForm({ ...form, lastName: value });
          }}
        />
        <input
          type="tel"
          placeholder="Telephone"
          name="phone"
          value={form.phone}
          onChange={(event) => {
            const { value } = event.target;
            setForm({ ...form, phone: value });
          }}
        />
        <input type="reset" value="Reset" />
      </form>
    </div>
  );
}
export default App;
```

With the addition of the `App.css` that you copied it should look something like this:

![homepage](https://inputmask.s3.amazonaws.com/inputmask1.PNG)

As it stands right now, our form can accept input values but there is no client-side input validation nor are there input masks to format the fields like we want to. We basically have a form we can type whatever we want into it and reset the form.

### Upper Case Mask

For the first name let's go ahead and make the entry all uppercase. This is a common input mask and one of the easier ones to accomplish. We are just going to uppercase as the user type.

```javascript
<input
  type="text"
  placeholder="First name"
  name="firstName"
  value={form.firstName}
  onChange={(event) => {
    const { value } = event.target;
    setForm({
      ...form,
      firstName: value.replace(/[^A-Za-z]/gi, "").toUpperCase(),
    });
  }}
/>
```

Let's see how this works. First we [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the `value` from `event.target.value`. Then we set the state of the form by adding the first name to it. The `value.replace()` will take what value, as we type, and perform an input validation on it. The [`String.prototype.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method does exactly like it sounds: it will replace whatever you want with something else. For example, we can easily replace every occurrence of the word "Navy" with "Rubber Ducky Patrol". In this case we are using a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) to check for the occurrence of anything that _is not_ an English letter. The `toUpperCase()` will then take whatever is a letter and uppercase it. Easy.

### Upper case first letter

For the last name we are going to only uppercase the first letter. Sort of a formal way of writing someones name. So steve will turn into Steve.

```javascript
<input
  type="text"
  placeholder="Last name"
  name="lastName"
  value={form.lastName}
  onChange={(event) => {
    const { value } = event.target;
    setForm({
      ...form,
      lastName:
        value
          .replace(/[^A-Za-z]/gi, "")
          .charAt(0)
          .toUpperCase() + value.slice(1),
    });
  }}
/>
```

Again we have an `onChange` event in the `input`. We destructure the `value` from `event.target.value`. Then we set the last name using the `String.prototype.replace()` method, scrubbing the string for anything that is not a letter. Then we use [`String.prototype.charAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) method to find the first letter (zero indexed) uppercase it, then add the rest of the string to the end.

### Phone number input mask

Our last input mask is a little tricky. We want an input that looks like this: (XXX) XXX-XXXX as we type. If a user types 3-digits it should look like this `(123)`. When they type 7-digits it will look something like this `(123) 456`. Then when they type in all 10-digits it will look something like this `(123) 456-7890`. We can easily use the `String.prototype.replace()` method but it won't do it _as we type_. 🤔
Let's go ahead and move the logic out of the `App` component and take a real close look what we need to do.
We can mask the input based on the previous value, adding digits and required punctuation as we type by comparing string lengths.

Here's a list of things we should do:

- First we check if there is even a value. Else it will return `undefined`.
- Next we only allow digits 1-9. We do this by using the `String.prototype.replace()` method.
- Check that the length of input value is greater than the previous value. Since the previous value is going to be the initial value of phone number, and is an empty string, that's what we are comparing to.
- Now the magic. If the length of the value we are typing equals 3 then we add a parentheses to the each side `(123)`. We accomplish by using a [`Template literal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Template literals are string literals allowing embedded expressions.
- If the length is 6 then do this `(123) 456`
- Finally return the whole completed string with the parentheses and the hyphen.

Here's the function described above:

```javascript
const normalizePhone = (value, previousValue) => {
  // Any value at all?
  if (!value) return value;
  // replace method to only allow digits 1-9
  const nums = value.replace(/[^\d]/g, ""); // only allows 0-9
  // If the length of value is greater than nothing
  if (!previousValue || value.length > previousValue.length) {
    // Is the length = 3? If true, add a parentheses to each side (123)
    if (nums.length === 3) return `(${nums})`;
    // Is the length = 6? If true, add a parentheses to each side (123)
    // and add the other three numbers
    if (nums.length === 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;
    // These next two statements cover everything in between all numbers being equal
    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}-`;
    // Finally add add a parentheses to each side (123)
    // Add the next three numbers
    // Add a hyphen and the last 4 numbers
    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`;
  }
};
```

Let's put it to work in the input field.

```javascript
<input
  type="tel"
  placeholder="Telephone"
  name="phone"
  value={form.phone}
  onChange={(event) => {
    const { value } = event.target;
    const phoneMask = normalizePhone(value, initialFormState.phone);
    setForm({
      ...form,
      phone: phoneMask,
    });
  }}
/>
```

It took a little more work but check it out:

![input phone gif](https://inputmask.s3.amazonaws.com/inputmaskgif.gif)

Easy, right?

## Wrapping it up

In this lesson we covered a couple ways to create an input mask for an input, as a user types. It is just reusing the `String.prototype.replace()` method, a few regular expressions, and some clever logic. Input masks are great for good UX/UI design and are helpful for when you want to POST to your database. I hope you enjoyed the tutorial. Leave a comment down below.

Here's all the code:

```javascript
import React, { useState } from "react";
import "./App.css";

const normalizePhone = (value, previousValue) => {
  if (!value) return value;
  const nums = value.replace(/[^\d]/g, ""); // only allows 0-9

  if (!previousValue || value.length > previousValue.length) {
    if (nums.length === 3) return `(${nums})`;
    if (nums.length === 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;

    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;

    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`;
  }
};

function App() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    phone: "",
  };

  const [form, setForm] = useState(initialFormState);

  const reset = (event) => {
    event.preventDefault();
    setForm({ ...form, ...initialFormState });
  };

  return (
    <div className="App">
      <h1>Input Mask Example</h1>
      <h2>Form Example</h2>
      <form onReset={reset} className="testform">
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={form.firstName}
          onChange={(event) => {
            const { value } = event.target;
            setForm({
              ...form,
              firstName: value.replace(/[^A-Za-z]/gi, "").toUpperCase(),
            });
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={form.lastName}
          onChange={(event) => {
            const { value } = event.target;
            setForm({
              ...form,
              lastName:
                value
                  .replace(/[^A-Za-z]/gi, "")
                  .charAt(0)
                  .toUpperCase() + value.slice(1),
            });
          }}
        />
        <input
          type="tel"
          placeholder="Telephone"
          name="phone"
          value={form.phone}
          onChange={(event) => {
            const { value } = event.target;
            setForm({
              ...form,
              phone: normalizePhone(value, initialFormState.phone),
            });
          }}
        />
        <input type="reset" value="Reset" />
      </form>
      <h2>Form Submitted Data</h2>
      <pre>
        <code>{JSON.stringify(form)}</code>
      </pre>
    </div>
  );
}

export default App;
```

### CodeSandBox

{% codesandbox compassionate-jang-m1txd %}

### Live

http://inputmasktut.surge.sh/

## Vets Who Code

Did you like what you read? Want to see more?
Let me know what you think about this tutorial in the comments below.
As always, a donation to Vets Who Code goes to helping veteran, like myself, in learning front end development and other coding skills. You can donate here: [VetsWhoCode](https://vetswhocode.io/donate)
Thanks for your time!
