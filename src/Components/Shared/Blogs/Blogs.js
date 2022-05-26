import React from 'react';

const Blogs = () => {
    return (
        <div className="my-10 px-4 blogs flex flex-wrap gap-5 justify-center max-w-[100%]">
            <div className="blog w-[500px] max-w-[100%] bg-white p-5 shadow-lg rounded-xl">
                <p className="text-2xl font-semibold pb-3">How to improve the performance of a React Application?</p>
                <div className="text-gray-500 font-mdeium">
                    To optimize the performance of React App we should Chunk our codes into Multiple Files. We should use Using Production Mode Flag in Webpack. Optimizing Dependencies is also very important. We should not use Inline Functions in the Render Function. Avoiding Index as Key for map.
                </div>
            </div>
            <div className="blog w-[500px] max-w-[100%] bg-white p-5 shadow-lg rounded-xl">
                <p className="text-2xl font-semibold pb-3">What are the different ways to manage a state in a React application?</p>
                <div className="text-gray-500 font-mdeium">
                    By Using useState()<br />
                    By Using Context API<br />
                    By using Reducer<br />
                    We can also use custom hooks<br />
                    Using Data Fetching Libraries
                </div>
            </div>
            <div className="blog w-[500px] max-w-[100%] bg-white p-5 shadow-lg rounded-xl">
                <p className="text-2xl font-semibold pb-3">How does prototypical inheritance work?</p>
                <div className="text-gray-500 font-mdeium">
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects.
                    It is a method by which an object can inherit the properties and methods of another object
                </div>
            </div>
            <div className="blog w-[500px] max-w-[100%] bg-white p-5 shadow-lg rounded-xl">
                <p className="text-2xl font-semibold pb-3">Why you do not set the state directly in React</p>
                <div className="text-gray-500 font-mdeium">
                    The React useState Hook allows us to track state in a function component.
                    State generally refers to data or properties that need to be tracking in an application.
                    As React updates the DOM based on state changes we use setProducts.
                    If we use products = [...] React wont re-render the UI.
                </div>
            </div>
            <div className="blog w-[500px] max-w-[100%] bg-white p-5 shadow-lg rounded-xl">
                <p className="text-2xl font-semibold pb-3">Implement a search to find products by name</p>
                <div className="text-gray-500 font-mdeium">
                    If I want exact macthes
                    <div className='bg-gray-200 py-2 px-3 rounded-md' style={{ fontFamily: 'monospace' }}>
                        const newProducts = products.filter(
                        <br /> &nbsp; &nbsp; (product) {'=>'} product.name === name
                        <br />)
                    </div>

                    If I don't want case sensitive
                    <div className='bg-gray-200 py-2 px-3 rounded-md' style={{ fontFamily: 'monospace' }}>
                        const lowerName = name.toLowerCase();<br />
                        const newProducts = products.filter(
                        <br /> &nbsp; &nbsp; (product) {'=>'} product.name.toLowerCase() === lowerName
                        <br />)
                    </div>

                    If matching any part of the name is ok
                    <div className='bg-gray-200 py-2 px-3 rounded-md' style={{ fontFamily: 'monospace' }}>
                        const lowerName = name.toLowerCase();<br />
                        const newProducts = products.filter(
                        <br /> &nbsp; &nbsp; (p) {'=>'} p.name.toLowerCase().includes(lowerName)
                        <br />)
                    </div>
                </div>
            </div>
            <div className="blog w-[500px] max-w-[100%] bg-white p-5 shadow-lg rounded-xl">
                <p className="text-2xl font-semibold pb-3">What is a unit test? Why should write unit tests?</p>
                <div className="text-gray-500 font-mdeium">
                    Unit testing means testing an individual React Component.
                    Unit Testing is important for React Apps, as it helps in testing the individual functionality of React components.
                    Moreover, any error in code can be identified at the beginning itself, saving time to rectify it at later stages
                </div>
            </div>
        </div>
    );
};

export default Blogs;