import styles from "./Container.module.scss";
const Container: React.FC<{ children: JSX.Element }> = (props) => {
    return <div className={styles["container"]}>{props.children}</div>;
};
export default Container;
