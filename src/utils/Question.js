import React from 'react'
import { Card, CardBody, Row, Col, CardTitle, CardText } from 'reactstrap';



const Question = ({ data, className }) => (
  <div className={className}>
    <h2 className="mb-4">{data.get('Name')}</h2>
    <Row>
      {
        ['A', 'B', 'C', 'D'].map((ans) =>
          <Col sm={12} md={6} className="mb-4">
            <Card>
              <CardBody>
                <CardTitle><strong>{ans}</strong></CardTitle>
                <CardText>
                  {data.get(`Answer ${ans}`)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        )
      }
    </Row>
  </div>
)

export default Question
