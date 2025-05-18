import { PlusCircle } from "phosphor-react";
import styles from "./App.module.css";
import logo from "./assets/Logo-todoList.svg";
import Clipboard from "./assets/Clipboard.svg";
import "./global.css";
import { useCallback, useRef, useState } from "react";
import ItemList from "./Components/ItemList";
import { DataMock, type IDataMock } from "./Utils/DataMock.ts";

function App() {
  const [dataList, setDataList] = useState<IDataMock[]>(DataMock);
  const concluidas = dataList.filter((item) => item.done).length;
  console.log(concluidas);
  const dataRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    const dataListFirst: IDataMock = {
      id: new Date().getTime(),
      description: "",
      done: false,
    };
    console.log("Antes", dataList);

    if (dataRef.current?.value) {
      dataListFirst.description = dataRef.current.value;
      setDataList((dataOld) => [...dataOld, dataListFirst]);
      console.log("depois", dataList);
      dataRef.current.value = "";
    }
  };

  const handleDeleteClick = (id: number) => {
    const dataListToRemove = dataList.filter((data) => data.id != id);
    setDataList(dataListToRemove);
  };

  const handleDoneClick = useCallback(
    (id: number) => {
      setDataList((prev) =>
        prev.map((data) => {
          if (data.id === id) {
            if (data.done) {
              return { ...data, done: false };
            }
            return { ...data, done: true };
          }
          return data;
        })
      );
    },
    [setDataList]
  );

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="" />
      </header>

      <main className={styles.mainContent}>
        <div className={styles.contentInput}>
          <input
            placeholder="Adicione uma nova tarefa"
            type="text"
            name=""
            id=""
            ref={dataRef}
          />
          <button onClick={handleAddClick}>
            Criar
            <PlusCircle size={20} />
          </button>
        </div>

        <section className={styles.contentPanelTasksNumber}>
          <div className={styles.contentCreatTask}>
            <strong>Tarefas Criadas</strong>
            <div className={styles.numberCreateTask}>{dataList.length - 1}</div>
          </div>

          <div className={styles.contentConcludedTask}>
            <strong>Tarefas concluidas</strong>
            <div className={styles.numberConcludedTask}>{`${concluidas} de ${
              dataList.length - 1
            }`}</div>
          </div>
        </section>

        <div className={styles.contentList}>
          {dataList.length == 1 ? (
            <div className={styles.contentFallBack}>
              <img src={Clipboard} alt="" width={56} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            dataList.map((dataMap) => {
              return (
                dataMap.description != "" && (
                  <ItemList
                    doneItem={() => handleDoneClick(dataMap.id)}
                    id={dataMap.id}
                    key={dataMap.id}
                    description={dataMap.description}
                    removeItem={() => handleDeleteClick(dataMap.id)}
                  />
                )
              );
            })
          )}
        </div>
      </main>
    </>
  );
}

export default App;
