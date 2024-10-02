import React from 'react'

export default function Footer() {
  return (
    <footer className="flex-shrink-0 h-[5vh] min-h-[30px] flex items-center justify-center bg-gray-200 text-xs sm:text-sm">
        <p>&copy; {new Date().getFullYear()}</p>
        <a href="https://github.com/brianros" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
          Brian Rosenfeld
        </a>
      </footer>
  )
}
