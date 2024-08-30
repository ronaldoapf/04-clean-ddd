import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityId(authorId),
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
