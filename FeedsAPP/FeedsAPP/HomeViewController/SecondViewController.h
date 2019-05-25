//
//  SecondViewController.h
//  FeedsAPP
//
//  Created by Yueyue on 2019/5/11.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import <UIKit/UIKit.h>

//@interface SecondViewController : UIViewController
@interface SecondViewController : UIViewController<UITableViewDataSource,UITableViewDelegate>{
    
}

@property (nonatomic,retain) UITableView *tableView;


@end

