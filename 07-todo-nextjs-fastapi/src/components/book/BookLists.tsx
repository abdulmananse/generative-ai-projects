import React from "react";

const getBooks = async () => {

  new Promise ((resolve)=> setTimeout(resolve, 5000));

  const resp = await fetch("https://simple-books-api.glitch.me/books", {
    cache: "no-store",
  });

  if (!resp.ok) {
    throw new Error("Error fetch data from server");
  }

  const response = await resp.json();
  return response;
}



export default async function BookLists() {
  const books:any = await getBooks();

  return ( 
    <>
    {books.map((book : any) => (
            <div key={book.id} className="flex flex-wrap -m-4">
              <div className="p-4 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  
                  <p className="leading-relaxed mb-6">Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland.</p>
                  <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">{book.name}</span>
                      <span className="text-gray-500 text-sm">{book.type}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
    </>
  );
}
