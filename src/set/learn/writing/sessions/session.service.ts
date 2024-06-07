import { Injectable } from '@nestjs/common';
import randomSetTerm from '../../utils/randSetId';

@Injectable()
export class SessionService {
  private readonly session: any[] = [];

  createNewSession(uuid, writingSet) {
    const randomTerm = randomSetTerm(writingSet.set);
    const newSession: any = {
      uuid: uuid,
      id: writingSet.id,
      totalTerms: writingSet.set.length,
      currentTerm: randomTerm,
      termsLeft: writingSet.set,
      correctTerms: [],
      wrongTerms: [],
    };
    this.session.push(newSession);
    return { status: 'created' };
  }

  findSession(uuid: string) {
    return this.session.find((session) => session.uuid === uuid);
  }

  checkAnswer(uuid: string, answer: string) {
    const session = this.findSession(uuid);
      if (session.currentTerm.term === answer) {
        session.correctTerms.push(session.currentTerm);
        session.termsLeft.splice(
          session.termsLeft.indexOf(session.currentTerm),
          1,
        );
        session.currentTerm = randomSetTerm(session.termsLeft);
        return { isCorrect: true };
      } else {
        const previousCurrentTerm = session.currentTerm.term;
        session.wrongTerms.push(session.currentTerm);
        session.termsLeft.splice(
          session.termsLeft.indexOf(session.currentTerm),
          1,
        );
        session.currentTerm = randomSetTerm(session.termsLeft);
        return { isCorrect: false, correctTerm: previousCurrentTerm };
      }

  }
}
