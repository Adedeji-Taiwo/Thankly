import { StringValueToken } from 'html2canvas/dist/types/css/syntax/tokenizer'
import React, { FC } from 'react'


type LatestName = {
  name: string,
  handleLatestDownload: () => void,
}


const LatestDownload: FC<LatestName> = ({ name, handleLatestDownload }) => {
  return (
    <div className='pt-24'>
      <h2 className="text-3xl font-bold text-gray-900 mb-7 md:text-4xl dark:text-white relative w-max">
        Latest download
      </h2>

      <div className="overflow-x-auto relative  shadow-gray-600/10 dark:shadow-none rounded-t-3xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
          <thead className="text-xs text-gray-600 dark:text-gray-300 uppercase rounded-t-3xl border-gray-100 bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Card
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 border-gray-100 dark:border-gray-700">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
              </th>
              <td className="py-4 px-6">
                <span className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline" onClick={handleLatestDownload}>Download</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default LatestDownload