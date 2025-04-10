import HeaderLayout from "@/components/header-layout";
import styles from './index.module.css';
import TimePicker from "@/components/TimePicker";

const AddTime = () => {
    return (
        <>
            <HeaderLayout>알람추가</HeaderLayout>
            <div className={styles.container}>
                <TimePicker />
            </div>
        </>
    );
};

export default AddTime;
