import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import './Visualization.scss'

export default function Visualization() {
    const [key, setKey] = useState('login');

    return (
        <div className="viz-container row justify-content-center align-items-center">
            <div className="col-md-10">
                {/* references */}
                {/* https://react-bootstrap.github.io/components/tabs/ */}
                <Tabs
                    defaultActiveKey="login"
                    activeKey={key}
                    id="uncontrolled-tab-example"
                    onSelect={(k) => setKey(k)}
                    fill
                >
                <Tab eventKey="login" title="Login Visualization">
                    {
                        key === 'login' &&
                        <iframe title="Login Visualization" width="100%" height="450" src="https://datastudio.google.com/embed/reporting/b60cab91-386d-47aa-87f6-2a9c90f46bbb/page/G0t8C" frameborder="0" style={{border:0}} allowfullscreen></iframe>
                    }
                </Tab>
                <Tab eventKey="recipe" title="Recipe Visualization">
                    {
                        key === 'recipe' &&
                        <iframe title="Recipe Visualization" width="100%" height="450" src="https://datastudio.google.com/embed/reporting/e67fea71-294f-4dac-9b92-94c4d1b7fac9/page/YDu8C" frameborder="0" style={{border:0}} allowfullscreen></iframe>
                    }
                </Tab>
                </Tabs>
            </div>
        </div>
    )
}
