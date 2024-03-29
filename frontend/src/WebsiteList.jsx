import React from 'react'

const WebsiteList = ({websites}) => {
    return(
    <div>
        <h3>Websites</h3>
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