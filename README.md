Since version 10.0 ts-node has defined @types/node as a peer dependency. If the version of npm is at least 7.0, the peer dependencies of a project are automatically installed by npm. If you have an older npm, the peer dependency must be installed explicitly:
npm install --save-dev @types/node
**Q**: what is peer dependancy in npm context? Explain to me in simplest form, please
**A**: In the context of npm (Node Package Manager), a peer dependency is a specific type of dependency relationship between JavaScript packages. It's used to express a requirement where a package expects a certain other package to be present in the application that uses it, but it doesn't want to include that package itself as part of its own dependencies.

Here's a simple way to understand it:

1. **Regular Dependency**: When a package lists another package as a regular dependency, it means that the package needs that other package to work correctly, and npm will automatically install it when you install the first package.

2. **Peer Dependency**: When a package lists another package as a peer dependency, it means that the package expects the application using it to have that other package already installed. It won't automatically install it as its own dependency, but it relies on the fact that the application will provide it.
Think of it like this: Regular dependencies are like ingredients you include in a recipe, and npm takes care of getting those ingredients for you. Peer dependencies are like saying, "I need a certain ingredient to be present in the kitchen, but I'm not going to fetch it myself; I trust that someone else will make sure it's there."

Peer dependencies are commonly used when multiple packages in an application need to work together with a specific version of a shared dependency. This helps avoid conflicts and ensures that all the packages are using a compatible version of that shared dependency.

**Q**:Since version 10.0 ts-node has defined @types/node as a peer dependency.
From what I understood from your explanations, the above sentence means that ts-node expect  that @types/node package already be in my project. So when I install ts-node, it won't automatically install @types/node, but it assume that I installed it already for correct working. Is my understanding right?
**A**: Yes, your understanding is correct. When ts-node specifies `@types/node` as a peer dependency, it means that when you install ts-node, it won't automatically install `@types/node` as part of its own dependencies. Instead, it assumes that you have already installed `@types/node` in your project because it needs it for correct operation.

In this scenario:

1. You need to ensure that you have `@types/node` installed in your project separately.
2. When you install `ts-node`, it won't try to fetch or update `@types/node`, but it will rely on the fact that you've already taken care of installing it.
3. This approach helps maintain compatibility and avoids version conflicts, ensuring that ts-node works with the `@types/node` version you have in your project.
So, make sure to have `@types/node` installed in your project when using `ts-node` to ensure everything functions correctly.

**Q**:If the version of npm is at least 7.0, the peer dependencies of a project are automatically installed by npm.
So it means that when I install ts-node, it will works fine, because npm already install @types/node package before, or does it mean that when I install ts-node, npm also install @types/node package together with ts-node?

**A**: As of npm version 7.0 and later, npm does indeed automatically handle the installation of peer dependencies by default. So, if you have npm 7.0 or a higher version, when you install `ts-node`, npm will also install `@types/node` (if it's specified as a peer dependency) alongside `ts-node`.

This means that when you install `ts-node` using npm 7.0+, you don't need to worry about separately installing `@types/node`. npm will take care of it, ensuring that `ts-node` has its peer dependencies satisfied for correct operation.

**Q**: why do we use req.query and not req.body? Explain the difference, please (it was asked about /bmi endpoint)

**A**: In your Express application, you are using `req.query` to access data sent to the server via query parameters in the URL. This is commonly used for GET requests when you want to pass data to the server as part of the URL.

`req.query` is used for accessing query parameters, which are typically included in the URL after the question mark (`?`) and are key-value pairs separated by ampersands (`&`). For example, in the URL `http://localhost:3002/bmi?height=180&weight=72`, the `height` and `weight` are query parameters, and you can access them using `req.query.height` and `req.query.weight`.

On the other hand, `req.body` is used for accessing data sent to the server in the request body. This is commonly used for HTTP methods like POST or PUT, where you want to send a larger amount of data, such as form data, JSON payloads, or file uploads, to the server. The data sent in the request body is typically in a different format, such as JSON or form-urlencoded data, and is often used when you need to create or update resources on the server.

Here's a brief summary of the differences:

1. `req.query`:
   - Used for accessing query parameters in the URL.
   - Typically used for GET requests.
   - Query parameters are visible in the URL.
   - Suitable for passing small amounts of data, often for filtering or specifying details of a request.

2. `req.body`:
   - Used for accessing data sent in the request body.
   - Commonly used for HTTP methods like POST and PUT.
   - Data in the request body is not visible in the URL.
   - Suitable for sending larger amounts of data, such as form submissions, JSON payloads, or file uploads.

In your specific use case, you are calculating BMI, which can be done using query parameters because you only need a couple of numeric values (height and weight) to perform the calculation, and these values are relatively small and can be easily included in the URL. If you were dealing with more complex data or data that shouldn't be exposed in the URL, you might use `req.body` and a different HTTP method like POST.

for sending a POST request to endpoint http://localhost:3003/exercises, use this command in terminal:
**curl -X POST -H "Content-Type: application/json" -d '{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}' http://localhost:3003/exercises**