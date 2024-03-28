import React from 'react'

const WebsiteList = ({websites}) => {
    return(
    <div>
        <h2>Websites</h2>
        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {websites.map((website) => (
                    <tr key={website.id}>
                        <td>{website.url}</td>
                        <td>{website.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default WebsiteList