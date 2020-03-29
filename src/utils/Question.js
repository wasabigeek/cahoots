import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap';



const Question = ({ data, className }) => (
  <div className={className}>
    <h2 className="mb-4">{data.get('Name')}</h2>
    <Row>
      {
        ['A', 'B', 'C', 'D'].map((ans) =>
          <Col sm={12} md={6} className="mb-4">
            <Card>
              <CardBody>
                <strong>{ans}</strong> {data.get(`Answer ${ans}`)}
              </CardBody>
            </Card>
          </Col>
        )
      }
    </Row>
  </div>
)

export default Question
