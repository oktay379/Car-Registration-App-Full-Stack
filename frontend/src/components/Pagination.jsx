import React from 'react'

const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="flex mt-4">
            {pages.map((page, i) => (
                <span key={i} className="ml-2">
                <button
                    className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200"
                    onClick={() => setCurrentPage(page)} 
                >
                    {page}
                </button>
                </span>
            ))}
        </div>

    )
}

export default Pagination