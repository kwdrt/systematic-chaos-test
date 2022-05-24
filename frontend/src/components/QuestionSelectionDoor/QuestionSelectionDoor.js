import React, { useState, useEffect } from 'react';
import { Door, DoorColumn } from './QuestionSelectionDoorStyles';
import { Button, Row } from 'react-bootstrap';
import { Content } from '../App/AppGeneralStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';
import { getParentQuestions } from '../../utils/Api';
import Loader from '../Loader/Loader';
import ExpeditionSummary from '../ExpeditionSummary/ExpeditionSummary';

// if only one element of id -1 or -2 then do not generate doors but go to score screen
// will be done in routing after answering a question, so that we never get only the start or only the end node here

function generateDoor(question, navigate, expeditionId, noDoors) {
    return (
        <DoorColumn key={question.id} xl={12 / noDoors} md={12}>
            <Row className="mx-auto">
                <h3>{question.difficulty.toUpperCase()}</h3>
            </Row>

            <Row>
                <Door />
            </Row>

            <Row className="mx-auto">
                <h3>{question.category.toUpperCase()}</h3>
            </Row>

            <Row className="mx-auto">
                <Button
                    onClick={() =>
                        navigate(`${PageRoutes.QUESTION_ANSWER}`, {
                            state: { activityId: expeditionId, nodeId: question.id },
                        })
                    }
                >
                    Wybierz
                </Button>
            </Row>
        </DoorColumn>
    );
}

function QuestionSelectionDoor() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState();
    const location = useLocation();
    const { activityId: expeditionId, nodeId: parentId } = location.state;

    useEffect(() => {
        if (parentId == null || expeditionId == null) {
            navigate(PageRoutes.HOME); //TODO: when ExpeditionInfo component will be ready, navigate to them
        } else {
            setQuestions(getParentQuestions(+parentId, +expeditionId));
        }
    }, [parentId, expeditionId, navigate]);

    return (
        <Content>
            {questions === undefined ? (
                <Loader />
            ) : (
                <>
                    {questions.find(q => q.id === -2) ? (
                        <ExpeditionSummary expeditionId={expeditionId} />
                    ) : (
                        <Row className="m-0">
                            {questions.map((question, key) =>
                                generateDoor(question, navigate, expeditionId, questions.length)
                            )}
                        </Row>
                    )}
                </>
            )}
        </Content>
    );
}

export default QuestionSelectionDoor;
