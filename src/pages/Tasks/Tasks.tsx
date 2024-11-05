import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import './Tasks.scss'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import TaskCardComponent from '../../components/TaskCardComponent/TaskCardComponent'
import { useData } from '../../hooks/useData'
import { IGetTasks } from '../../interfaces'

function Tasks() {
	const { t } = useTranslation()
	const { getTasks, getCompletedTasks, setGetCompletedTasks } = useData()

	const [completedTasks, setCompletedTasks] = useState<IGetTasks[]>([])
	const [uncompletedTasks, setUncompletedTasks] = useState<IGetTasks[]>([])

	const handleIdCompletionTask = (id: number): void => {
		setGetCompletedTasks(prev => {
			if (prev) {
				const newCompletedTasks: number[] = [...prev, id];

				return newCompletedTasks
			}

			return prev
		})
	}

	useEffect(() => {
		if (getTasks && getCompletedTasks) {
			const completed = getTasks
				.filter(task => getCompletedTasks.includes(task.id))
				.map(task => ({ ...task, taskStatus: 'completed' as const }))

			const uncompleted = getTasks
				.filter(task =>
					!getCompletedTasks.includes(task.id)
				)
				.map(task => ({ ...task, taskStatus: 'uncompleted' as const }))

			setCompletedTasks(completed)
			setUncompletedTasks(uncompleted)
		}
	}, [getTasks, getCompletedTasks])

	const renderTaskBlock = (tasksArray: IGetTasks[], title?: string): JSX.Element | false => (
		tasksArray?.length > 0 &&
			<div className="invitation__task-card-wrapper">
				{
					title &&
						<h2 className="invitation__task-card-title">
							{ title }
						</h2>
				}

				{
					tasksArray.map((task, index) => (
						<TaskCardComponent
							key={index}
							title={task.title}
							price={task.price}
							premium={task.premium}
							icon={task.icon}
							taskStatus={task.taskStatus!}
							taskId={task.id}
							url={task.url}
							onIdCompletionTask={handleIdCompletionTask}
						/>
					))
				}
			</div>
	)

	return (
		<>
			<main className="invitation">
				<HeaderComponent
					title={t('Tasks')}
					description={t('Complete tasks and get extra attempts')}
				/>

				{
					uncompletedTasks.length <= 0 &&
						<div className="invitation__empty-wrapper">
							<p className="invitation__empty-title">
								{ t("It's empty here for now") }
							</p>
						</div>
				}

				{ renderTaskBlock(uncompletedTasks) }
				{ renderTaskBlock(completedTasks, t('Completed')) }
			</main>

			<FooterComponent />
		</>
	)
}

export default Tasks